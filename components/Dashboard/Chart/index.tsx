export interface IChartValue {
    label: string;
    value: number;
    color: string;
}
export interface IChartData {
    type: string;
    name: string;
    XAxis: string;
    YAxis: string;
    values: IChartValue[];
}