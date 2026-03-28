import chalk from 'chalk'; // Para colorir os logs

export class Logger {
  private formatMessage(level: string, emoji: string, messages: unknown[]): string {
    const timestamp = new Date().toISOString();
    return `${emoji} [${timestamp}] [${level}] ${messages.map((msg) => (typeof msg === 'object' ? JSON.stringify(msg, null, 2) : msg)).join(' ')}`;
  }

  info(...messages: unknown[]) {
    console.log(chalk.blue(this.formatMessage('INFO', 'ℹ️', messages)));
  }

  success(...messages: unknown[]) {
    console.log(chalk.green(this.formatMessage('SUCCESS', '✅', messages)));
  }

  warn(...messages: unknown[]) {
    console.log(chalk.yellow(this.formatMessage('WARNING', '⚠️', messages)));
  }

  error(...messages: unknown[]) {
    console.log(chalk.red.bold(this.formatMessage('ERROR', '❌', messages)));
  }

  debug(...messages: unknown[]) {
    console.log(chalk.magenta(this.formatMessage('DEBUG', '🐞', messages)));
  }
}
