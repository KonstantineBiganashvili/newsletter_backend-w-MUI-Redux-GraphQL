const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} = require('graphql');
const Category = require('../models/Category');
const CategoryType = require('./CategoryType');

const ArticleType = new GraphQLObjectType({
  name: 'Article',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    surname: { type: GraphQLString },
    date: { type: GraphQLString },
    email: { type: GraphQLString },
    title: { type: GraphQLString },
    phone: { type: GraphQLString },
    content: { type: GraphQLString },
    category: {
      type: CategoryType,
      resolve(parent, args) {
        return Category.findByPk(parent.categoryId);
      },
    },
  }),
});

module.exports = ArticleType;
