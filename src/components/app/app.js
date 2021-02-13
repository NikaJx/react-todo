import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './app.css';

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                {label: 'Going to learn React', important: false, like: false, id: 1},
                {label: 'That is so good', important: false, like: false, id: 2},
                {label: 'I need break...', important: false, like: false, id: 3}
            ],
            term: '',
            filter: 'all'
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToogleLiked = this.onToogleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);

        this.maxId = 4;
    }

    deleteItem(id) {
        this.setState(({ data }) => {
            const index = data.findIndex(elem => elem.id === id); 
            
            const before = data.slice(0, index);
            const after = data.slice(index + 1);

            const newArr = [...before, ...after];

            return {
                data: newArr
            }
        });
    }

    addItem(body) {
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        };

        this.setState(({ data }) => {
            const newArr = [...data, newItem];

            return {
                data: newArr
            }
        });
    }

    onToggleImportant(id) {
        this.setState(({ data }) => {
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = {...old, important: !old.important};

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            return {
                data: newArr
            }
        });
    }

    onToogleLiked(id) {
        this.setState(({ data }) => {
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = {...old, like: !old.like};

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            return {
                data: newArr
            }
        });
    }

    searchPost(items, term) {
        if(term.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.label.indexOf(term) > -1;
        });
    }

    filterPost(items, filter) {
        if(filter === 'like') {
            return items.filter(item => item.like);
        } else {
            return items;
        }
    }

    onUpdateSearch(term) {
        this.setState({
            term: term
        });
    }

    onFilterSelect(filter) {
        this.setState({
            filter: filter
        });
    }

    render() {
        const {filter} = this.state;
        const liked = this.state.data.filter(item => item.like).length;
        const allPosts = this.state.data.length;

        const visiblePosts = this.filterPost(this.searchPost(this.state.data, this.state.term), this.state.filter);

        return (
            <div className="app">
                 <AppHeader liked={liked} allPosts={allPosts}/>
                 <div className="search-panel d-flex">
                     <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                     <PostStatusFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                 </div>
                 <PostList posts={visiblePosts} 
                     onDelete={this.deleteItem}
                     onToggleImportant={this.onToggleImportant}
                     onToogleLiked={this.onToogleLiked}
                 />
                 <PostAddForm onAdd={this.addItem}/>
            </div>
         )
    }
}
