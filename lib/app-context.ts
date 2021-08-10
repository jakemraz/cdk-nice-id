export interface AppContextProps {
    applicationName: string;
    deployEnvironment: string;
  }
  
  export class AppContext {
    private static instance: AppContext;
    private props = {
      applicationName: '',
      deployEnvironment: ''
    };
  
    private constructor() {}
  
    public static getInstance(): AppContext {
      if (!AppContext.instance) {
        AppContext.instance = new AppContext();
      }
      return AppContext.instance;
    }
  
    public initialize(props: AppContextProps) {
      this.props = props;
    }
  
    public get appName() {
      return this.props.applicationName;
    }
  
    public get env() {
      return this.props.deployEnvironment;
    }
  }