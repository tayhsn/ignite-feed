import styles from './index.module.css';
import { PencilLine } from 'phosphor-react';
import { Avatar } from '../Avatar';

export function Sidebar() {
   return (
      <aside className={styles.sidebar}>
         <img
            className={styles.cover}
            src='https://images.unsplash.com/photo-1566837945700-30057527ade0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50'
         />

         <div className={styles.profile}>
            <Avatar src='https://github.com/tayhsn.png' />

            <strong>Tayanne Silva</strong>
            <span>Software developer</span>
         </div>

         <footer>
            <a href='#'>
               <PencilLine size={20} />
               Editar o seu perfil
            </a>
         </footer>
      </aside>
   );
}
