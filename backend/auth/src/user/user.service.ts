import {HttpStatus, Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {User} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateCommentDto} from "./dto/create-comment";


@Injectable()
export class UserService {
    constructor(@Inject('MOVIE_SERVICE') private readonly client: ClientProxy,
                @InjectRepository(User) private userRepository: Repository<User>) {
    }

    async getComments(userId: number, reviewId: number) {
        try {
            const user = await this.userRepository.findOneBy({id: userId});
            if(!user) return HttpStatus.NOT_FOUND;
            const reviewWithComments = await this.client.send('get.comments', reviewId);
            return reviewWithComments;
        } catch (e) {
            return e.message;
        }

    }

    async createComment(userId: number, reviewId: number, dto: CreateCommentDto) {
        try {
            const user = await this.userRepository.findOneBy({id: userId});
            if(!user) return HttpStatus.NOT_FOUND;
            if(!dto.parentId) dto.parentId = 0;
            const review = await this.client.send('create.comment', {reviewId: reviewId, comment: dto.comment, parentId: dto.parentId})
            return review;
        } catch (e) {
            return e.message;
        }
    }

    async deleteUser(email: string) {
        const user = await this.userRepository.findOneBy({email: email});
        if(user) {
            await this.userRepository.remove(user);
            return 'Удален';
        }
        return 'Нет такого';
    }
}
