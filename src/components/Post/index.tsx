import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Avatar } from '../Avatar';
import { Comment } from '../Comment';
import styles from './index.module.css';

interface Author {
   name: string;
   role: string;
   avatarUrl: string;
}

interface Content {
   type: 'paragraph' | 'link';
   content: string;
}

interface PostProps {
   author: Author;
   publishedAt: Date;
   content: Content[];
}

export function Post({ author, publishedAt, content }: PostProps) {
   const [comments, setComments] = useState(['Post top!!!']);
   const [newCommentText, setNewCommentText] = useState('');

   const publishedDateFormatted = format(
      publishedAt,
      "d ' de ' LLLL ' ás ' HH:mm'h'",
      { locale: ptBR }
   );

   const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
      locale: ptBR,
      addSuffix: true,
   });

   const handleCreateNewComment = (event: FormEvent) => {
      event.preventDefault();

      setComments([...comments, newCommentText]);
      setNewCommentText('');
   };

   const handleNewCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      event.target.setCustomValidity('');
      setNewCommentText(event.target.value);
   };

   const handlenewCommentInvalid = (
      event: InvalidEvent<HTMLTextAreaElement>
   ) => {
      event.target.setCustomValidity('Esse campo é obrigatório!');
   };

   const deleteComment = (commentToDelete: string) => {
      const commentsWithoutDeletedOne = comments.filter(
         (comment) => comment !== commentToDelete
      );
      setComments(commentsWithoutDeletedOne);
   };

   const isNewCommentInputEmpty = newCommentText.length === 0;

   return (
      <article className={styles.post}>
         <header>
            <div className={styles.author}>
               <Avatar src={author.avatarUrl} />

               <div className={styles.authorInfo}>
                  <strong>{author.name}</strong>
                  <span>{author.role}</span>
               </div>
            </div>

            <time
               title={publishedDateFormatted}
               dateTime={publishedAt.toISOString()}
            >
               {publishedDateRelativeToNow}
            </time>
         </header>

         <div className={styles.content}>
            {content.map((line) => {
               switch (line.type) {
                  case 'paragraph':
                     return <p key={line.content}>{line.content}</p>;
                  case 'link':
                     return (
                        <p>
                           <a href='' key={line.content}>
                              {line.content}
                           </a>
                        </p>
                     );
               }
            })}
         </div>

         <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
            <strong>Deixe seu feedback</strong>

            <textarea
               name='comment'
               placeholder='Deixe um comentário'
               onChange={handleNewCommentChange}
               value={newCommentText}
               onInvalid={handlenewCommentInvalid}
               required
            />

            <footer>
               <button type='submit' disabled={isNewCommentInputEmpty}>
                  Publicar
               </button>
            </footer>
         </form>

         <div className={styles.commentList}>
            {comments.map((comment) => (
               <Comment
                  key={comment}
                  content={comment}
                  onDeleteComment={deleteComment}
                  publishedDateFormatted={publishedDateFormatted}
                  publishedDateRelativeToNow={publishedDateRelativeToNow}
                  publishedAt={publishedAt}
               />
            ))}
         </div>
      </article>
   );
}
