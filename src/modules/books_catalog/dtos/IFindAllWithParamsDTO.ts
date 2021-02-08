export default interface IFindAllWithParamsDTO {
    publisherValue: string | undefined;
    publicationDateOrder: 'ASC' | 'DESC' | undefined;
    priceValue: number | undefined;
    priceOrder: 'ASC' | 'DESC' | undefined;
}
