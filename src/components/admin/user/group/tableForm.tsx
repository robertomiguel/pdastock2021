import { Table, Button } from 'antd'
import { useContext, useEffect } from 'react'
import { columnsForm } from './columns'
import UserGroupStore from '../../../../stores/userGroup'
import { observer } from 'mobx-react-lite'
import { EditorForm } from './editor'
import { useCallback } from 'react'

export const TableForm = observer(() => {
    const userGroupStore = useContext(UserGroupStore)

    const getList = useCallback(async () => {
        await userGroupStore.getList()
    }, [userGroupStore])

    useEffect(() => {
        getList()
    }, [getList])

    return (
        <div style={{ padding: '1em', maxWidth: '1080px' }}>
            <EditorForm />
            <Button
                type="primary"
                onClick={async () => {
                    userGroupStore.item = {}
                    userGroupStore.openEditor = true
                }}
            >
                Nuevo
            </Button>
            <Table
                loading={userGroupStore.isLoading}
                style={{ width: '100%' }}
                columns={columnsForm}
                dataSource={userGroupStore.list}
                size="middle"
                pagination={false}
                onChange={async (pagination, filters, sorter: any) => {
                    if (userGroupStore.sort.field === sorter.field)
                        userGroupStore.sort.sorted =
                            userGroupStore.sort.sorted * -1
                    else
                        userGroupStore.sort = {
                            field: sorter.field,
                            sorted: 1,
                        }
                    await userGroupStore.getList()
                }}
                showSorterTooltip={false}
            />
        </div>
    )
})
