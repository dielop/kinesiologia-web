import mysql from 'mysql2/promise';
import keys from './keys';

const connect = () => {
    const pool = mysql.createPool(keys.database);
    pool.getConnection();
    return pool;
}
export const Mysql = connect();