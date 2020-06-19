# HolyJS-2019-msk

[https://www.youtube.com/playlist?list=PL8sJahqnzh8KXjvw3i0bY-fCn1abQMbv8]

---

# Guillermo Rauch — Client rendering, server rendering, pre rendering

[https://youtu.be/impcGrPD0xQ]

## Static <b>advantages</b>

- Cheap scaling
- High availability
- Reduced backend load
- O(1) TTFB
- All-or-nothing code rollouts
- Very high throughput
- Great security model
- Failures contained to build

## Static <b>shortcoming</b>

- <b>Lengthy build</b> process
- Small changes trigger <b>full rebuild</b>
- Full pre-build intractable at <b>>N pages</b>
- <b>SEO suffers</b> unless 100% pre-built
- <b>Perf suffers</b> unless 100% pre-built
- <b>Not dynamic</b>

## <del>Static</del> SSR <del>shortcomings</del> advantages

- <del>Lengthy build</del> <b>Quick build</b> process
- Small changes <b>are instant</b> <del>trigger full rebuild</del>
- <del>Full pre-build intractable at >N</del> <b>infinity pages</b>
- <b>SEO is great</b><del>suffers unless 100% pre-built</del>
- <b>Pert is great</b><del>suffers unless 100% pre-built</del>
- <del>Not</del><b>dynamic</b>

## SSR <b>shortcomings</b>

- <b>Duplicate business logc</b> on server and client, usually problematic (e.g.: node-fetch)
- <b>Complex ops and maintenance</b> (readiness probes, alerts, metrics)
- <b>Very expensive</b>
- Practically always <b>single region</b>
- Prone to <b>stability problems and memory leaks</b>
- High dependence on <b>ad-hoc caching services</b> for scaling
- Increased <b>security attack surface</b> (Node.js)
- <b>Duplicate monitoring, tracing and exception-reporting</b> in both server and client
- <b>Unstable and unpredictable TTFB</b>
- <b>Failures are catastrophic</b> (500 page)

## JAMstack

- J = JavaScript
- A = API
- M = Markup

JAMstack: retain the static model, <b>defer dynamic computation to the client</b>

## JAMstack <b>advantages</b>

- All the benefits of static
- Single error reporting surface
- Single debugging story
- Great local dev story
- Plugs into any backend

Preloading + Parallelism yields <b>great performance</b>

Solution: <b>combine</b> static site generation with dynamic client-side computation

Introducing <b>Incremental Static Site Generation (iSSG)</b>

## iSSG <b>advantages</b>

- Highly available (tolerates backend downtime)
- Always global (html files in CDN)
- Always fast (pre-rendered / tolerates backend slowness)
- Scales infinitely
- Cheap

`Most applications can be modeled fully "statically" thanks to iSSG + client-side JS`
Static is new Dynamic

Next.js is now tackling the essential comlexity

iSSG is coming soon to Next.js canary

---

# Павел Черторогов — GraphQL-фрагменты на клиенте: История появления, ошибки использования

[https://youtu.be/0bpZiMVJh14]

## Что такое GraphQL-фрагмент?

Простой GraphQL-запрос

```gql
query CustomerScreen {
  customer {
    companyName
    address {
      city
      country
    }
  }
}
```

Тот же запрос но с фрагментом

```gql
query CustomerScreen {
  customer {
    ...CustomerCard // Fragment spread
  }
}

fragment CustomerCard /* Fragment name */ on Customer /* Type condition */ {
  companyName
  address {
    city
    country
  }
}
```

Фрагменты позволяют описать необходимые данные для компонента

```jsx
const fragment = gql`
  fragment CustomerCard on Customer {
    companyName
    address {
      city
      country
    }
  }
`;

const CustomerCard = (props: CustomerCard /* as Type for props */) => (
  <>
    <b>{props.companyName /* fields as properties */}</b>
    {props.address.city}
  </>
);
```

Фрагмент - это кусочек серверного типа для вашего компонента на фронте

Это позволяет утащить статическую типизацию с сервера на клиент

Фейсбук прошел следующие этапы:

- JSON Models (ручное написание моделей)
- Type Models (использование типизации из серверной схемы)
- Response Models (типизация на уровне запроса)
- Fragment Models (типизация и инкапсуляция на уровне компонента)

Relay юзает Fragment Models (Apollo 3 обещают, мб в 4)

Изменения на сервере графкл и подсветка ошибок (тивоп) на клиенте до билда.

### Ошибки фронтендеров

#### 1 - Нельзя переиспользовать фрагменты

Ошибка: использовать общий фрагмент для двух компонент

Решение: завести свой фрагмент для каждого компонента
Плевать на кописаст

один компонент = один фрагмент
это позволяет изменять фрагменты и не бояться, что где-то что-то сломается в другом месте

#### 2 - Фрагмент хранить где-то в другом файле

Плохо: Avatar_data.graphql и AvatarRound.jsx

Хорошо AvatarRound.jsx

Относитесь к фрагменту, как к PropTypes`ам
На основе фрагмента можно генерировать тайпинги для статической типизации

А что, если файл с компонентой и фрагментом становится большим?
Уносить кусок React-компонента в новый под-файл и его используемый фрагмент туда же.
Нет смысла разносить компоненту и фрагмент на два разных файла.

#### 3 - <Query/> не связывают с роутингом

Переменные для GraphQL-запроса необходимо брать из `location`
Обычно <Query/> вызывается прямо в роутинге

#### 4 - С ApolloClient или Relay не нужно использовать Redux

Никакого Redux!
У ApolloClient или Relay есть:

- свой store
- свой механизм подписок (connect)
- свой механизм получения данных от сервера

Забываем как страшный сон эти самые экшены и редьюсеры!

Для клиентского стейта не стоит юзать Apollo (можно что угодно)

### Recap:

- Нельзя переиспользовать фрагменты
- Нельзя фрагмент держать в другом файле
- Не забывать <Query/> связывать с роутингом
- Не крутить Redux к ApolloClient или Relay

---