import { Table, Button } from 'antd'
import { useContext, useEffect } from 'react'
import { columnsForm } from './columns'
import DocumentTypeStore from '../../../../stores/documentType'
import { observer } from 'mobx-react-lite'
import { EditorForm } from './editor'
import { useCallback } from 'react'

export const TableForm = observer(() => {
    const documentTypeStore = useContext(DocumentTypeStore)

    const getList = useCallback(async () => {
        await documentTypeStore.getList()
    }, [documentTypeStore])

    useEffect(() => {
        getList()
    }, [getList])

    return (
        <div style={{ padding: '1em', maxWidth: '1080px' }}>
            <EditorForm />
            <Button
                type="primary"
                onClick={async () => {
                    documentTypeStore.item = {}
                    documentTypeStore.openEditor = true
                }}
            >
                Nuevo
            </Button>
            <Table
                loading={documentTypeStore.isLoading}
                style={{ width: '100%' }}
                columns={columnsForm}
                dataSource={documentTypeStore.list}
                size="middle"
                pagination={false}
                onChange={async (pagination, filters, sorter: any) => {
                    if (documentTypeStore.sort.field === sorter.field)
                        documentTypeStore.sort.sorted =
                            documentTypeStore.sort.sorted * -1
                    else
                        documentTypeStore.sort = {
                            field: sorter.field,
                            sorted: 1,
                        }
                    await documentTypeStore.getList()
                }}
                showSorterTooltip={false}
            />
        </div>
    )
})
