export interface IChartValue {
    label: string;
    value: number;
    color: string;
}
export interface IChartData {
    key: string;
    type: string;
    name: string;
    XAxis: string;
    YAxis: string;
    values: IChartValue[];
}