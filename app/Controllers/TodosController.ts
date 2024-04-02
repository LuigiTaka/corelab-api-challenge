import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import db from 'App/Models/index.js'

export default class TodosController {
  public async index(ctx: HttpContextContract) {
    const idUser = 1;


    if (ctx.request.params().id) {
      const record = await db.Todos.findOne({where: {id: ctx.request.params().id}})

      if (!record) {
        return ctx.response.status(404);
      }

      return ctx.response.status(200).send({
        results: [record]
      })
    }

    const all = await db.Todos.findAll({where: {idUser: idUser}});
    return ctx.response.status(200).send({
      results: all
    })
  }


  public async post(ctx: HttpContextContract) {

    const whiteList = ['title', 'body', 'color', 'idUser'];
    const body = ctx.request.body();


    //@todo Valida os dados
    try {
      body.idUser = 1; //@todo Pegar usuario da sessão
      const todo = await db.Todos.create(body, {fields: whiteList})
      todo.save()
      return ctx.response.status(200).send({todo: todo})
    } catch (e) {
      ctx.response.status(500).send({message: e.error})
    }
  }

  public async put(ctx: HttpContextContract) {
    const whiteList = ['title', 'body', 'color'];
    const todoId = ctx.request.params().id;
    const body = ctx.request.body();
    //@todo Valida os dados

    if (!whiteList.every((key) => body.hasOwnProperty(key))) {
      return ctx.response.status(421).send({
        message: "Informe todos os dados para modificar o registro."
      })
    }

    await db.Todos.update(body, {
        where: {id: todoId},
        fields: whiteList
      }
    )

    const todoRecord = await db.Todos.findOne({where: {id: todoId}})
    return ctx.response.status(200).send({todo: todoRecord})
  }

  public async patch(ctx: HttpContextContract) {
    const whiteList = ['title', 'body', 'color']
    const todoId = ctx.request.params().id
    const body = ctx.request.body()
    const record = await db.Todos.findOne({where: {id: todoId}});
    if (!record) {
      return ctx.response.status(404).send({
        message: "Registro não encontrado."
      })
    }

    await db.Todos.update(body, {
      where: {id: todoId},
      fields: whiteList
    });

    const todoRecord = await db.Todos.findOne({
      where: {id: todoId}
    })
    return ctx.response.status(200).send({
      todo: todoRecord
    })
  }

  public async delete(ctx: HttpContextContract) {
    const todoId = ctx.request.params().id;

    const record = await db.Todos.findOne({where: {id: todoId}});
    if (!record) {
      return ctx.response.status(404).send({
        message: "Registro não encontrado."
      })
    }

    await db.Todos.destroy({where: {id: todoId}})
    return ctx.response.status(200).send({});
  }
}
