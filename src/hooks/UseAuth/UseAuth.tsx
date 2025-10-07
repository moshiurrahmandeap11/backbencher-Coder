
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import type { AuthContextType } from '../../contexts/AuthContext/AuthContext';

const UseAuth = (): AuthContextType => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('UseAuth must be used within an AuthProvider');
    }

    return authContext;
};

export default UseAuth;