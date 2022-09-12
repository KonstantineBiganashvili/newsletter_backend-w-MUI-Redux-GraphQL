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

    articlesCount: {
      type: GraphQLInt,
      args: {
        startDate: { type: GraphQLString },
        endDate: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Article.count({
          where: {
            date: {
              [Op.between]: [args.startDate || 0, args.endDate || Infinity],
            },
          },
        });
      },
    },

    articlesWithLimit: {
      type: new GraphQLList(ArticleType),
      args: {
        limit: { type: new GraphQLNonNull(GraphQLString) },
        offset: { type: new GraphQLNonNull(GraphQLString) },
        startDate: { type: GraphQLString },
        endDate: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Article.findAll({
          limit: args.limit,
          offset: args.offset,
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
        startDate: { type: GraphQLString },
        endDate: { type: GraphQLString },
        limit: { type: new GraphQLNonNull(GraphQLString) },
        offset: { type: new GraphQLNonNull(GraphQLString) },
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

    removeArticle: {
      type: new GraphQLList(ArticleType),
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        startDate: { type: GraphQLString },
        endDate: { type: GraphQLString },
        limit: { type: new GraphQLNonNull(GraphQLString) },
        offset: { type: new GraphQLNonNull(GraphQLString) },
      },

      resolve(parent, args) {
        return (
          Article.destroy({ where: { id: args.id } }) &&
          Article.findAll({
            where: {
              date: {
                [Op.between]: [args.startDate || 0, args.endDate || Infinity],
              },
            },
            limit: args.limit,
            offset: args.offset,
          })
        );
      },
    },

    editArticle: {
      type: new GraphQLList(ArticleType),
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString },
        surname: { type: GraphQLString },
        email: { type: GraphQLString },
        title: { type: GraphQLString },
        date: { type: GraphQLString },
        phone: { type: GraphQLString },
        content: { type: GraphQLString },
        categoryId: { type: GraphQLInt },
        startDate: { type: GraphQLString },
        endDate: { type: GraphQLString },
        limit: { type: new GraphQLNonNull(GraphQLString) },
        offset: { type: new GraphQLNonNull(GraphQLString) },
      },

      resolve(parent, args) {
        return (
          Article.update(
            {
              name: args.name,
              surname: args.surname,
              date: args.date,
              email: args.email,
              title: args.title,
              phone: args.phone,
              content: args.content,
              categoryId: args.categoryId,
            },
            { where: { id: args.id } }
          ) &&
          Article.findAll({
            where: {
              date: {
                [Op.between]: [args.startDate || 0, args.endDate || Infinity],
              },
            },
            limit: args.limit,
            offset: args.offset,
          })
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation });
