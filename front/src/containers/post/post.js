import {Post} from "../../components/post/post";

export function PostContainer({subject, body, tags}) {
    return <Post subject={subject} body={body} tags={hashtagString(tags)}/>
}

const hashtagString = (tags) => {
    return tags.reduce((hashtagString, tag) =>
        hashtagString + "#" + tag.split(" ").join("") + " ", "").trim();
};
