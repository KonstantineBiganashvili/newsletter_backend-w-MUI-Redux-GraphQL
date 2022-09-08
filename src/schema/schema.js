const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
} = require('graphql');

const Category = require('../models/Category');
const Article = require('../models/Article');
const CategoryType = require('../types/CategoryType');
const ArticleType = require('../types/ArticleType');
const { Op } = require('sequelize');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    categories: {
      type: new GraphQLList(CategoryType),
      resolve(parent, args) {
        return Category.findAll();
      },
    },

    articles: {
      type: new GraphQLList(ArticleType),
      resolve(parent, args) {
        return Article.findAll();
      },
    },

    articlesWithLimit: {
      type: new GraphQLList(ArticleType),
      args: {
        limit: { type: new GraphQLNonNull(GraphQLString) },
        offset: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return Article.findAll({ limit: args.limit, offset: args.offset });
      },
    },

    articlesFilterdByDate: {
      type: new GraphQLList(ArticleType),
      args: {
        startDate: { type: GraphQLString },
        endDate: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Article.findAll({
          where: {
            date: {
              [Op.between]: [args.startDate || 0, args.endDate || Infinity],
            },
          },
        });
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addArticle: {
      type: ArticleType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        surname: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
        categoryId: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        return Article.create({
          name: args.name,
          surname: args.surname,
          date: args.date,
          email: args.email,
          title: args.title,
          phone: args.phone,
          content: args.content,
          categoryId: args.categoryId,
        });
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation });
