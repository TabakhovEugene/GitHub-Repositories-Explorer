import React, { useState } from 'react';
import styles from './ListItem.module.css';
import listStore from '../../stores/ListStore';

interface ListItemProps {
    item: any;
}

const ListItem: React.FC<ListItemProps> = ({ item }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(item.name);
    const [description, setDescription] = useState(item.description);

    const handleEdit = () => {
        if (isEditing) {
            listStore.editItem(item.id, { name, description });
        }
        setIsEditing(!isEditing);
    };

    const handleDelete = () => {
        listStore.removeItem(item.id);
    };

    return (
        <div className={styles.item}>
            <div className={styles.content}>
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={styles.input}
                        />
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={styles.textarea}
                        />
                    </>
                ) : (
                    <>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                    </>
                )}
            </div>
            <div className={styles.actions}>
                <a href={item.html_url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    View on GitHub
                </a>
                <div className={styles.buttons}>
                    <button onClick={handleEdit} className={styles.button}>
                        {isEditing ? 'Save' : 'Edit'}
                    </button>
                    <button onClick={handleDelete} className={styles.button}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ListItem;