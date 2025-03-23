import { Folder, Image, Film, MusicNote, FileText, HeartFill } from "react-bootstrap-icons";

export default ({ type }) => {
    switch (type) {
        case "folder":
            return <Folder size={40} className="text-warning" />;
        case "image":
            return <Image size={40} className="text-success" />;
        case "video":
            return <Film size={40} className="text-danger" />;
        case "audio":
            return <MusicNote size={40} className="text-primary" />;
        case "document":
            return <FileText size={40} className="text-secondary" />;
        case "favorite":
            return <HeartFill size={40} className="text-danger" />;
        default:
            return <FileText size={40} className="text-muted" />;
    }
};
