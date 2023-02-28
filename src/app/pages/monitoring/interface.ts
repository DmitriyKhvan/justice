export interface IMonitoring {
  actionDetail: any;
  actionLang: any;
  actionStatus: any;
  clientFio: string;
  clientId: number | null;
  clientInn: string;
  clientType: string;
  contractDate: string;
  contractFile: string;
  contractId: number | null;
  creditCurrency: string;
  creditEnd: string;
  creditId: number | null;
  creditStart: string;
  creditSumm: string;
  creditType: string;
  delayDate: string;
  gType: [
    {
      active: boolean;
      description: string;
      id: number | null;
      lang: {
        en: string;
        ru: string;
        uz: string;
      };
      order: number;
      type: string;
      value: string;
    }
  ];
  guarantee: any[];
  id: number | null;
  interestRate: number | null;
  lastStepStatus: string;
  penaltyCharge: string;
  remainderCurrentDebt: string;
  status: number | null;
  statusName: any;
  stepLang: any;
  totalDebt: string;
}
