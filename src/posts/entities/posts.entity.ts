import { UsersModel } from 'src/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// 자동으로 table을 생성해준다.
@Entity()
export class PostsModel {
  @PrimaryGeneratedColumn()
  id: number;

  // UsersModel과 연동 Foreign Key를 이용해서
  // null이 될 수 없다.
  // 하나의 사용자에 여러개의 포스트가 있어야 되니까까
  @ManyToOne(() => UsersModel, (user) => user.posts, {
    nullable: false,
  })
  author: UsersModel;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  likeCount: number;

  @Column()
  commentCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
