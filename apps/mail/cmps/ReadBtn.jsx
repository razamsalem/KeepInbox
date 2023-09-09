import { mailService } from "../services/mail.service.js"

export function ReadBtn({ mail, onSetMailRead }) {

    function toggleReadMail(ev) {
        ev.stopPropagation()
        onSetMailRead()
    }

    return (
        <button className={`google-btn read-btn ${mail.isRead && 'unread'}`}
            onClick={toggleReadMail}
            title={mail.isRead ? 'Mark mail as unread' : 'Mark mail as read'}
        />
    )
}