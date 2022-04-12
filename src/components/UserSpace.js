import Notes from './Notes';

export const UserSpace = (props) => {
    const {showAlert} = props
    return (
        <div>
< Notes showAlert={showAlert} />
            </div>
    )
}
