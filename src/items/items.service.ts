import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; //PrismaService를 통해 db에서 아이템목록 가져온다.
import { BuyItemDto, ItemChangeStatusDto } from './dto/change-item-status.dto';

@Injectable() //클래스 : 의존성 주입 가능 (다른 곳에서 이 클래스를 불러와서 사용가능)
export class ItemsService {
  constructor(private readonly prisma: PrismaService) {}

  //전체 아이템 조회 + 필터링
  async getItems(mainCategoryId?: number, subCategoryId?: number) {
    //필터링 조건
    const items = await this.prisma.item.findMany({
      //items변수 = 아이템 전부 가져오기
      where: {
        ...(mainCategoryId && { mainCategoryId: mainCategoryId as number }), //mainCategoryId가 truthy -> {mainCategoryId: mainCategoryId} 객체 반환 , falsy -> undefined
        ...(subCategoryId && { subCategoryId: subCategoryId as number }), //subCategoryId가 truthy -> {subCategoryId: subCategoryId} 객체 반환, falsy -> undefined
      },
      include: {
        mainCategory: true, //mainCategory 정보도 가져온다
        subCategory: true, //subCategory 정보도 가져온다
      },
    });

    //필터링 된 아이템이 없을 경우
    if (items.length === 0) {
      throw new NotFoundException('Items not found');
    }
    return items;
  }

  //아이템 추가 addItem (개발/테스트 용)
  async addItem(addItemDto: ItemChangeStatusDto): Promise<void> {
    const { userId, itemId } = addItemDto;

    await this.prisma.userItem.create({
      data: {
        userId,
        itemId,
      },
    });
  }

  //아이템 구매 buyItem
  async buyItem(buyItemDto: BuyItemDto): Promise<void> {
    const { userId, itemIds } = buyItemDto;

    await this.prisma.$transaction(async (prisma) => {
      //사용자 존재 여부 확인
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      //아이템 존재 확인
      const items = await prisma.item.findMany({
        where: { id: { in: itemIds } },
      });

      if (items.length !== itemIds.length) {
        //아이템 수량 확인
        throw new NotFoundException('Some items are not found');
      }

      //총 가격 계산
      const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

      if (user.point < totalPrice) {
        throw new BadRequestException('Insufficient points to buy these items');
      }

      //소유 여부 확인
      const existingItems = await prisma.userItem.findMany({
        where: {
          userId: userId,
          itemId: { in: itemIds },
        },
      });

      if (existingItems.length > 0) {
        const ownedItemIds = existingItems.map((item) => item.itemId);
        throw new BadRequestException(
          `User already owns the following items: ${ownedItemIds.join(', ')}`,
        );
      }

      //포인트 차감
      await prisma.user.update({
        where: { id: userId },
        data: { point: { decrement: totalPrice } },
      });

      //유저-아이템 관계 생성
      const userItemsData = itemIds.map((itemId) => ({
        userId,
        itemId,
      }));

      await prisma.userItem.createMany({
        data: userItemsData,
      });
    });
  }

  //특정 사용자 아이템 목록 조회 getUserItems
  getUserItems(userId: number) {
    return this.prisma.userItem.findMany({
      where: { userId },
    });
  }

  //아이템 장착
  async equipItem(equipItemDto: ItemChangeStatusDto): Promise<void> {
    const { userId, itemId } = equipItemDto;
    const userItem = await this.prisma.userItem.findUnique({
      where: {
        userId_itemId: {
          userId,
          itemId,
        },
      },
    });

    if (!userItem) {
      throw new NotFoundException('Item not found for this user');
    }
    if (userItem.isEquipped) {
      throw new BadRequestException('Item is already equipped');
    }

    await this.prisma.userItem.update({
      where: { id: userItem.id },
      data: { isEquipped: true },
    });
  }

  //아이템 장착 해제
  async unequipItem(unequipItemDto: ItemChangeStatusDto): Promise<void> {
    const { userId, itemId } = unequipItemDto;
    const userItem = await this.prisma.userItem.findUnique({
      where: {
        userId_itemId: { userId, itemId },
      },
    });

    if (!userItem) {
      throw new NotFoundException('Item not found for this user');
    }

    if (!userItem.isEquipped) {
      throw new BadRequestException('Item is already unequipped');
    }

    await this.prisma.userItem.update({
      where: { id: userItem.id },
      data: { isEquipped: false },
    });
  }

  //특정 사용자의 특정 아이템 삭제
  async deleteUserItem(userId: number, itemId: number): Promise<void> {
    const userItem = await this.prisma.userItem.findUnique({
      where: {
        userId_itemId: {
          userId,
          itemId,
        },
      },
    });

    if (!userItem) {
      throw new NotFoundException('Item not found for this user');
    }

    await this.prisma.userItem.delete({
      where: { id: userItem.id },
    });
  }
}
