import ICreateVendorDto from '@modules/vendors/dtos/ICreateVendorDTO';
import ICreateBooksCatalogDTO from '../dtos/ICreateBookCatalogDTO';
import IFindAllWithParamsDTO from '../dtos/IFindAllWithParamsDTO';
import IFindVendorIdDTO from '../dtos/IFindVendorIdDTO';
import IUpdateBookVendorMatchIdBookCatalogDTO from '../dtos/IUpdateBookVendorMatchIdBookCatalogDTO';
import BooksCatalog from '../infra/typeorm/entities/BooksCatalog';

export default interface IBooksCatalogRepository {
    create(data: ICreateBooksCatalogDTO): Promise<BooksCatalog>;
    bulkCreate(data: ICreateBooksCatalogDTO[]): Promise<void>;
    updateBookVendorMatchId(
        bookVendorMatchId: IUpdateBookVendorMatchIdBookCatalogDTO,
    ): Promise<BooksCatalog>;
    findByVendorId(vendor_id: IFindVendorIdDTO): Promise<BooksCatalog[]>;
    findAll(params?: IFindAllWithParamsDTO): Promise<BooksCatalog[]>;
}
