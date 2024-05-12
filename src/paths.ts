const paths = {
    home() {
        return '/';
    },
    topicShow(topicsSlug: string) {
        return `/topics/${topicsSlug}`
    },
    postCreate(topicsSlug: string) {
        return `/topics/${topicsSlug}/new`;
    },
    postShow(topicsSlug: string, postId: string){
        return `/topics/${topicsSlug}/posts/${postId}`;
    },
    search(term: string) {
        return `/search?term=${term}`;
    }
};

export default paths;
