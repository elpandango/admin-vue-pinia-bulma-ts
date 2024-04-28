import PostsRepository from '@/repositories/PostsRepository';
import AuthRepository from "@/repositories/AuthRepository";
import UserRepository from "@/repositories/UserRepository";

const repositories: Record<string, any> = {
    'Posts': PostsRepository,
    'Auth': AuthRepository,
    'User': UserRepository,
}
export default {
    get: (name: keyof typeof repositories) => repositories[name]
};
