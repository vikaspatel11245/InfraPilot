export abstract class BaseDeployer {
  abstract deploy(context: any): Promise<{ url: string }>;
}
