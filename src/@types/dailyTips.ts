export interface IHistoryDailyTips {
    tip: string
    like?: boolean
}

export interface IDailyTips {
    previuosTips: IHistoryDailyTips[]
    setting?: string
}