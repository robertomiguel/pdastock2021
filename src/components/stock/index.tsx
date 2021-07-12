import { FilterForm } from './filter'
import { PaginationForm } from './paginator'
import { TableForm } from './tableForm'

export const Stock = (props: { selector: boolean }) => {
    return (
        <div>
            <div>
                <FilterForm />
            </div>
            <div>
                <TableForm selector={props.selector} />
            </div>
            <div>
                <PaginationForm />
            </div>
        </div>
    )
}
