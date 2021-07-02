import { Table, Button } from 'antd'
import { useContext, useEffect } from 'react'
import { columnsForm } from './columns'
import UserStore from '../../../../stores/user'
import { observer } from 'mobx-react-lite'
import { EditorForm } from './editor'
import { useCallback } from 'react'

export const TableForm = observer(() => {
    const userStore = useContext(UserStore)

    const getList = useCallback(async () => {
        await userStore.getList()
    }, [userStore])

    useEffect(() => {
        getList()
    }, [getList])

    return (
        <div style={{ padding: '1em', maxWidth: '1080px' }}>
            <EditorForm />
            <Button
                type="primary"
                onClick={async () => {
                    userStore.item = {}
                    userStore.openEditor = true
                }}
            >
                Nuevo
            </Button>
            <Table
                loading={userStore.isLoading}
                style={{ width: '100%' }}
                columns={columnsForm}
                dataSource={userStore.list}
                size="middle"
                pagination={false}
                onChange={async (pagination, filters, sorter: any) => {
                    if (userStore.sort.field === sorter.field)
                        userStore.sort.sorted =
                            userStore.sort.sorted * -1
                    else
                        userStore.sort = {
                            field: sorter.field,
                            sorted: 1,
                        }
                    await userStore.getList()
                }}
                showSorterTooltip={false}
            />
        </div>
    )
})
