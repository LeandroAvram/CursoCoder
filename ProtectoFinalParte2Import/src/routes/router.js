import express from 'express'


module.exports = {
  createRoute: () => {
    const router = express.Router()
    return {
      get: (route, controller) => router.route(route).get(controller),
      post: (route, controller) => router.route(route).post(controller),
      put: (route, controller) => router.route(route).put(controller),
      patch: (route, controller) => router.route(route).patch(controller),
      delete: (route, controller) => router.route(route).delete(controller),
      routes: () => router
    }
  }
}