import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import ListItem from '../ListItem/ListItem';
import listStore from '../../stores/ListStore';
import styles from './List.module.css';

const List: React.FC = observer(() => {
    const loaderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    listStore.loadMore();
                }
            },
            { threshold: 1.0 }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, []);

    return (
        <div className={styles.list}>
            {listStore.items.map((item) => (
                <ListItem key={item.id} item={item} />
            ))}
            {listStore.loading && (
                <div className={styles.loading}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            )}
            <div ref={loaderRef} style={{ height: '20px' }}></div>
        </div>
    );
});

export default List;