import { FilterForm } from './filter'
import { PaginationForm } from './paginator'
import { TableForm } from './tableForm'

export const Stock = () => {
    return (
        <div>
            <div>
                <FilterForm />
            </div>
            <div>
                <TableForm />
            </div>
            <div>
                <PaginationForm />
            </div>
        </div>
    )
}
