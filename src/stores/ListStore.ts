import { makeAutoObservable, runInAction } from 'mobx';
import { fetchRepositories } from '../services/api';

class ListStore {
    items: any[] = [];
    page = 1;
    loading = false;
    hasMore = true;

    constructor() {
        makeAutoObservable(this);
    }

    async loadMore() {
        if (this.loading || !this.hasMore) return;

        this.loading = true;
        try {
            const newItems = await fetchRepositories('react', this.page);
            runInAction(() => {
                this.items.push(...newItems);
                this.page += 1;
                this.hasMore = newItems.length > 0;
            });
        } catch (error) {
            console.error('Failed to load repositories:', error);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    removeItem(id: number) {
        this.items = this.items.filter((item) => item.id !== id);
    }

    editItem(id: number, newData: { name: string; description: string }) {
        this.items = this.items.map((item) =>
            item.id === id ? { ...item, ...newData } : item
        );
    }
}

export default new ListStore();