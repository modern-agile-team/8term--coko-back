import { ConsoleLogger, Global, Injectable } from '@nestjs/common';

@Global()
@Injectable()
export class LoggerService extends ConsoleLogger {}
