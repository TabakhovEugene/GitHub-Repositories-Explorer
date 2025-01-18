import React from 'react';
import Navbar from './components/Navbar/Navbar';
import List from './components/List/List';
import 'antd/dist/reset.css';

const App: React.FC = () => {
    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: '80px' }}>
                <List />
            </div>
        </div>
    );
};

export default App;