import React from 'react';

import PostListItem from '../post-list-item';
import './post-list.css';

const PostList = ({ posts, onDelete, id, onToggleImportant, onToogleLiked }) => {

    const elements = posts.map((item) => {
        const {id, ...itemProps} = item;
        return (
            <li key={item.id} className="list-group-item">
                <PostListItem 
                    {...itemProps}
                    onDelete={() => onDelete(id)}
                    onToggleImportant={() => onToggleImportant(id)}
                    onToogleLiked={() => onToogleLiked(id)}
                />
            </li>
        );
    });

    return (
        <ul className = "app-list list-group">
            { elements }
        </ul>
    )
}

export default PostList;