const { User } = require("../Models/User");
const { Paginator } = require('../helpers/Paginator')

exports.resolvers = {
	Query: {
		users: async (parente, { input }, ctx) => {
			const { active, locked, limit, page } = input;
			const P = Paginator(limit, page);

			const Active = active !== undefined ? active : true;
			const ACTIVE = !!Active;
			const LOCKED = locked || false;

			const users = await User.find({
				isActive: ACTIVE,
				isLock: LOCKED,
			})
				.limit(P.limit)
				.skip(P.page)
				.sort({
					name: 1,
				});

			return users;
		},
		user: async (parente, args, ctx) => {
			return null
		},
	},
	Mutation: {
		userCreate: async (parente, args, ctx) => {
			return null
		},
		userUpdate: async (parente, args, ctx) => {
			return null
		},
		userRemove: async (parente, args, ctx) => {
			return null
		},
	},
};
