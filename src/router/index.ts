import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
    meta: { titleKey: 'nav.home' },
  },
  {
    path: '/sobre-mi',
    name: 'about',
    component: () => import('@/pages/AboutPage.vue'),
    meta: { titleKey: 'nav.about' },
    alias: '/about',
  },
  {
    path: '/blog/:slug',
    name: 'blog-post',
    component: () => import('@/pages/BlogPostPage.vue'),
    props: true,
    meta: { titleKey: 'blog.label' },
  },
  {
    path: '/proyectos',
    name: 'projects',
    component: () => import('@/pages/ProjectsPage.vue'),
    meta: { titleKey: 'nav.projects' },
    alias: '/projects',
  },
  {
    path: '/contacto',
    name: 'contact',
    component: () => import('@/pages/ContactPage.vue'),
    meta: { titleKey: 'nav.contact' },
    alias: '/contact',
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFoundPage.vue'),
  },
]

/** Altura de la píldora flotante: el ancla no debe quedar debajo. */
const NAV_OFFSET = 96

/**
 * Espera a que el ancla exista antes de saltar a ella.
 *
 * Las vistas son componentes asíncronos y además entran con `<Transition>`,
 * así que cuando `scrollBehavior` corre el `#blog` de destino todavía no está
 * en el DOM: sin esta espera vue-router no encuentra el elemento y la página
 * se queda arriba, que era justo lo que pasaba al volver de una entrada.
 */
function waitForAnchor(hash: string, timeout = 1000): Promise<Element | null> {
  return new Promise((resolve) => {
    const started = performance.now()

    const look = () => {
      const el = document.querySelector(hash)
      if (el) return resolve(el)
      if (performance.now() - started > timeout) return resolve(null)
      requestAnimationFrame(look)
    }

    look()
  })
}

const router = createRouter({
  history: createWebHistory(),
  routes,

  async scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition

    if (to.hash) {
      const el = await waitForAnchor(to.hash)
      if (el) return { el: to.hash, behavior: 'smooth', top: NAV_OFFSET }
    }

    // Sin ancla: siempre arriba, y sin animar para que el desplazamiento no
    // compita con la transición de entrada de la vista.
    return { top: 0 }
  },
})

export default router
