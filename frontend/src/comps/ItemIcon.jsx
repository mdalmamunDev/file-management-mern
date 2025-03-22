
import { Folder, Image, Film, MusicNote, FileText, HeartFill } from "react-bootstrap-icons";

export default ({ type }) => {
    return (<>
        {type === 'folder' && <Folder size={40} className="text-warning" />}
        {type === 'image' && <Image size={40} className="text-success" />}
        {type === 'video' && <Film size={40} className="text-danger" />}
        {type === 'audio' && <MusicNote size={40} className="text-primary" />}
        {type === 'document' && <FileText size={40} className="text-secondary" />}
        {type === 'favorite' && <HeartFill size={40} className="text-danger" />}
    </>)
}
