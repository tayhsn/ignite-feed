import { useState } from 'react';
import { ThumbsUp, Trash } from 'phosphor-react';
import { Avatar } from '../Avatar';
import styles from './index.module.css';

interface CommentProps {
   content: string;
   publishedDateFormatted: string;
   publishedDateRelativeToNow: string;
   publishedAt: Date;
   onDeleteComment: (comment: string) => void;
}

export function Comment({
   content,
   publishedDateFormatted,
   publishedDateRelativeToNow,
   publishedAt,
   onDeleteComment,
}: CommentProps) {
   const [likeCount, setLikeCount] = useState(0);

   const handleDeleteComment = () => {
      onDeleteComment(content);
   };

   return (
      <div className={styles.comment}>
         <Avatar hasBorder={false} src='https://github.com/tayhsn.png' alt='' />

         <div className={styles.commentBox}>
            <div className={styles.commentContent}>
               <header>
                  <div className={styles.authorAndTime}>
                     <strong>Tayanne</strong>
                     <time
                        title={publishedDateFormatted}
                        dateTime={publishedAt.toISOString()}
                     >
                        {publishedDateRelativeToNow}
                     </time>
                  </div>

                  <button
                     onClick={handleDeleteComment}
                     title='Deletar comentário'
                  >
                     <Trash size={24} />
                  </button>
               </header>

               <p>{content}</p>
            </div>

            <footer>
               <button onClick={() => setLikeCount(likeCount + 1)}>
                  <ThumbsUp />
                  Aplaudir <span>{likeCount}</span>
               </button>
            </footer>
         </div>
      </div>
   );
}
