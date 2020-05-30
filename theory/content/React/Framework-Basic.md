# "Framework Base Tools / Components and Props"

## React.Component

[https://ru.react.js.org/docs/react-component.html]

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Привет, {this.props.name}</h1>;
  }
}
```

Единственный метод, который вы должны определить в подклассе React.Component — render(). Все другие методы, описанные на этой странице, являются необязательными.

### Монтирование

Эти методы вызывают в следующем порядке, когда экземпляр компонента создаётся и добавляется в DOM:

constructor()
static getDerivedStateFromProps()
render()
componentDidMount()

### Обновление

Обновление может быть вызвано изменениями в свойствах или состоянии. Эти методы вызываются в следующем порядке, когда компонент повторно отрисовывается:

static getDerivedStateFromProps()
shouldComponentUpdate()
render()
getSnapshotBeforeUpdate()
componentDidUpdate()

### Размонтирование

Этот метод вызывается, когда компонент удаляется из DOM:

componentWillUnmount()

### Обработка ошибок

Этот метод вызывается при возникновении ошибки во время отрисовки, в методе жизненного цикла или в конструкторе любого дочернего компонента.

static getDerivedStateFromError()
componentDidCatch()

### Другие API

Каждый компонент также предоставляет некоторые другие методы API:

setState()
forceUpdate()

### Свойства класса

defaultProps
displayName

### Свойства экземпляра

props
state

---

## Компоненты и свойства

[https://ru.react.js.org/docs/components-and-props.html]

### Функциональные и классовые компоненты

```jsx
function Welcome(props) {
  return <h1>Привет, {props.name}</h1>;
}
```

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Привет, {this.props.name}</h1>;
  }
}
```

Два вышеуказанных компонента эквивалентны с точки зрения React.

### Отрисовка компонента

```jsx
function Welcome(props) {
  return <h1>Привет, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(element, document.getElementById('root'));
```

Давайте посмотрим, что происходит в этом примере:

Мы вызываем ReactDOM.render() с элементом <Welcome name="Сара" />.
React вызывает компонент Welcome с объектом {name: 'Sara'} как props.
Наш компонент Welcome возвращает элемент <h1>Hello, Sara</h1> в качестве результата.
React DOM эффективно обновляет DOM, чтобы соответствовать <h1>Hello, Sara</h1>.

```
Примечание: Всегда называйте компоненты с заглавной буквы.

Если компонент начинается с маленькой буквы, React принимает его за DOM-тег. Например, <div /> это div-тег из HTML, а <Welcome /> это уже наш компонент Welcome, который должен быть в области видимости.
```

### Композиция компонентов

```jsx
function Welcome(props) {
  return <h1>Привет, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Алиса" />
      <Welcome name="Базилио" />
      <Welcome name="Буратино" />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

В приложениях, написанных на React с нуля, как правило, есть один компонент App, который находится на самом верху. В случае, если вы переписываете существующее приложение на React, имеет смысл начать работу с маленького компонента типа Button и постепенно двигаться «вверх» по иерархии.

### Извлечение компонентов

Не бойтесь разбивать компоненты на части.

```jsx
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img
          className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">{props.author.name}</div>
      </div>
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}
```

Этот компонент представляет собой комментарий в социальной сети. Его пропсы включают в себя author (объект), text (строка), и date (дата).

С этим компонентом может быть не очень удобно работать из-за излишней вложенности. Мы также не можем повторно использовать его составные части. Давайте извлечём из него пару компонентов.

Для начала извлечём Avatar:

```jsx
function Avatar(props) {
  return (
    <img className="Avatar" src={props.user.avatarUrl} alt={props.user.name} />
  );
}
```

Компоненту Avatar незачем знать, что он рендерится внутри Comment. Поэтому мы дали его пропу чуть менее конкретное имя — user, а не author.

Пропсы следует называть так, чтобы они имели смысл в первую очередь с точки зрения самого компонента, а уже во вторую тех компонентов, которые его рендерят.

Теперь можно немножко упростить наш Comment:

```jsx
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">{props.author.name}</div>
      </div>
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}
```

Следующим шагом извлечём компонент UserInfo, который рендерит Avatar рядом с именем пользователя:

```jsx
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">{props.user.name}</div>
    </div>
  );
}
```

Это позволит ещё сильнее упростить Comment:

```jsx
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}
```

Извлечение компонентов может сначала показаться неблагодарной работой. Тем не менее, в больших приложениях очень полезно иметь палитру компонентов, которые можно многократно использовать. Если вы не уверены, извлекать компонент или нет, вот простое правило. Если какая-то часть интерфейса многократно в нём повторяется (Button, Panel, Avatar) или сама по себе достаточно сложная (App, FeedStory, Comment), имеет смысл её вынести в независимый компонент.

### Пропсы можно только читать

Компонент никогда не должен что-то записывать в свои пропсы — вне зависимости от того, функциональный он или классовый.

`React-компоненты обязаны вести себя как чистые функции по отношению к своим пропсам.`

---

## ReactBaseClasses.js

[https://github.com/facebook/react/blob/master/packages/react/src/ReactBaseClasses.js]

---

## ReactElement.js

[https://github.com/facebook/react/blob/2afeebdcc4ed8a78ab5b36792f768078d70e1ffd/packages/react/src/ReactElement.js#L175]

---

## Что такое Virtual DOM?

[https://habr.com/ru/post/256965/]

Главная проблема DOM — он никогда не был рассчитан для создания динамического пользовательского интерфейса (UI). Мы можем работать с ним, используя JavaScript и библиотеки наподобие jQuery, но их использование не решает проблем с производительностью.
Посмотрите на современные социальные сети, такие как Twitter, Facebook или Pinterest.
После небольшого скроллинга, мы будем иметь десятки тысяч DOM-узлов, эффективно взаимодействовать с которыми — задача не из легких.

Для примера, попробуйте переместить 1000 div-блоков на 5 пикселей влево.
Это может занять больше секунды — это слишком много для современного интернета. Вы можете оптимизировать скрипт и использовать некоторые приемы, но в итоге это вызовет лишь головную боль при работе с огромными страницами и динамическим UI.

Вместо того, чтобы взаимодействовать с DOM напрямую, мы работаем с его легковесной копией. Мы можем вносить изменения в копию, исходя из наших потребностей, а после этого применять изменения к реальному DOM.
При этом происходит сравнение DOM-дерева с его виртуальной копией, определяется разница и запускается перерисовка того, что было изменено.

Но только если мы делаем это правильно. Есть две проблемы: когда именно делать повторную перерисовку DOM и как это сделать эффективно.

Когда?
Когда данные изменяются и нуждается в обновлении.
Есть два варианта узнать, что данные изменились:
Первый из них — «dirty checking» (грязная проверка) заключается в том, чтобы опрашивать данные через регулярные промежутки времени и рекурсивно проверять все значения в структуре данных.
Второй вариант — «observable» (наблюдаемый) заключается в наблюдении за изменением состояния. Если ничего не изменилось, мы ничего не делаем. Если изменилось, мы точно знаем, что нужно обновить.

Как?
Что делает этот подход действительно быстрым:
Эффективные алгоритмы сравнения
Группировка операций чтения/записи при работе с DOM
Эффективное обновление только под-деревьев

React создает легковесное дерево из JavaScript-объектов для имитации DOM-дерева. Затем он создает из них HTML, который вставляется или добавляется к нужному DOM-элементу, что вызывает перерисовку страницы в браузере.

Вывод

Virtual DOM — это техника и набор библиотек / алгоритмов, которые позволяют нам улучшить производительность на клиентской стороне, избегая прямой работы с DOM путем работы с легким JavaScript-объектом, имитирующем DOM-дерево.

---

## Композиция в сравнении с наследованием
[https://ru.react.js.org/docs/composition-vs-inheritance.html]

У React мощная модель композиции, и мы рекомендуем использовать композицию вместо наследования для повторного использования кода между компонентами.

### Меры предосторожности

Некоторые компоненты не знают заранее о своих дочерних элементах. Это особенно характерно для таких компонентов, как Sidebar или Dialog, которые представляют собой общие «ящики» (либо контейнеры).
Мы рекомендуем для таких компонентов использовать специальное свойство children для передачи дочерних элементов непосредственно в их вывод:

```jsx
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```

Это позволяет другим компонентам передавать им произвольные дочерние элементы, путём вложения в JSX:

```jsx
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Добро пожаловать!
      </h1>
      <p className="Dialog-message">
        Спасибо, что посетили наш космический корабль!
      </p>
    </FancyBorder>
  );
}
```

Хотя это менее распространено, иногда вам может понадобиться несколько «каналов вставки» в компоненте. В таких случаях вы можете придумать собственное соглашение вместо использования children:

```jsx
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```

React-элементы, такие как <Contacts /> и <Chat />, — это просто объекты, поэтому вы можете передавать их как свойства, как любые другие данные. Этот подход может напомнить вам о «слотах» в других библиотеках (например, во Vue.js — прим. пер.), но нет никаких ограничений на то, что вы можете передавать в качестве свойства в React.

### Специализация

Иногда мы рассматриваем компоненты как «частные случаи» других компонентов. Например, мы можем полагать, что WelcomeDialog является частным случаем Dialog.

В React это также достигается путём композиции, где более «конкретный» компонент отрисовывает более «общий» и настраивает его с помощью свойств:

```jsx
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Добро пожаловать"
      message="Спасибо, что посетили наш космический корабль!" />
  );
}
```

Композиция работает одинаково хорошо для компонентов, определённых в виде классов:

```jsx
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Программа исследования Марса"
              message="Как мы должны обращаться к вам?">
        <input value={this.state.login}
               onChange={this.handleChange} />

        <button onClick={this.handleSignUp}>
          Зарегистрируй меня!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Добро пожаловать на борт, ${this.state.login}!`);
  }
}
```

### А что насчёт наследования?

В Facebook мы используем React в тысячах компонентов, и мы не обнаружили каких-либо случаев использования, где мы бы порекомендовали создавать иерархии наследования компонентов.

Если вы хотите повторно использовать функциональность, отличную от пользовательского интерфейса, между компонентами, мы предлагаем извлечь её в отдельный модуль JavaScript. Компоненты могут импортировать его и использовать эту функцию, объект или класс, без расширения (наследования).

---

## Why Do We Write super(props)?
[https://overreacted.io/why-do-we-write-super-props/]

I wrote super(props) more times in my life than I’d like to know:

```jsx
class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOn: true };
  }
  // ...
}
```

Of course, the class fields proposal lets us skip the ceremony:

```jsx
class Checkbox extends React.Component {
  state = { isOn: true };
  // ...
}
```

Why do we call super? Can we not call it? If we have to call it, what happens if we don’t pass props? Are there any other arguments? Let’s find out.

In JavaScript, super refers to the parent class constructor. (In our example, it points to the React.Component implementation.)

Importantly, you can’t use this in a constructor until after you’ve called the parent constructor. JavaScript won’t let you:

```jsx
class Checkbox extends React.Component {
  constructor(props) {
    // 🔴 Can’t use `this` yet
    super(props);
    // ✅ Now it’s okay though
    this.state = { isOn: true };
  }
  // ...
}
```

There’s a good reason for why JavaScript enforces that parent constructor runs before you touch this. Consider a class hierarchy:

```jsx
class Person {
  constructor(name) {
    this.name = name;
  }
}

class PolitePerson extends Person {
  constructor(name) {
    this.greetColleagues(); // 🔴 This is disallowed, read below why
    super(name);
  }
  greetColleagues() {
    alert('Good morning folks!');
  }
}
```

Imagine using this before super call was allowed. A month later, we might change greetColleagues to include the person’s name in the message:

```jsx
 greetColleagues() {
    alert('Good morning folks!');
    alert('My name is ' + this.name + ', nice to meet you!');
  }
```

You might think that passing props down to super is necessary so that the base React.Component constructor can initialize this.props:

```jsx
// Inside React
class Component {
  constructor(props) {
    this.props = props;
    // ...
  }
}
```

But somehow, even if you call super() without the props argument, you’ll still be able to access this.props in the render and other methods. (If you don’t believe me, try it yourself!)

How does that work? It turns out that React also assigns props on the instance right after calling your constructor:

```jsx
 // Inside React
  const instance = new YourComponent(props);
  instance.props = props;
```

So even if you forget to pass props to super(), React would still set them right afterwards. There is a reason for that.

```jsx
// Inside React
class Component {
  constructor(props) {
    this.props = props;
    // ...
  }
}

// Inside your code
class Button extends React.Component {
  constructor(props) {
    super(); // 😬 We forgot to pass props
    console.log(props);      // ✅ {}
    console.log(this.props); // 😬 undefined 
  }
  // ...
}
```

It can be even more challenging to debug if this happens in some method that’s called from the constructor. And that’s why I recommend always passing down super(props), even though it isn’t strictly necessary:

```jsx
class Button extends React.Component {
  constructor(props) {
    super(props); // ✅ We passed props
    console.log(props);      // ✅ {}
    console.log(this.props); // ✅ {}
  }
  // ...
}
```

This ensures this.props is set even before the constructor exits.

---

## How Does React Tell a Class from a Function?
[https://overreacted.io/how-does-react-tell-a-class-from-a-function/]

```jsx
function Greeting() {
  return <p>Hello</p>;
}

class Greeting extends React.Component {
  render() {
    return <p>Hello</p>;
  }
}
```

When you want to render a <Greeting />, you don’t care how it’s defined:

```jsx
// Class or function — whatever.
<Greeting />
```

But React itself cares about the difference!

If Greeting is a function, React needs to call it:

```jsx
// Your code
function Greeting() {
  return <p>Hello</p>;
}

// Inside React
const result = Greeting(props); // <p>Hello</p>
```

But if Greeting is a class, React needs to instantiate it with the new operator and then call the render method on the just created instance:

```jsx
// Your code
class Greeting extends React.Component {
  render() {
    return <p>Hello</p>;
  }
}

// Inside React
const instance = new Greeting(props); // Greeting {}
const result = instance.render(); // <p>Hello</p>
```

In both cases React’s goal is to get the rendered node (in this example, <p>Hello</p>). But the exact steps depend on how Greeting is defined.

---

## Why Do React Elements Have a $$typeof Property
[https://overreacted.io/why-do-react-elements-have-typeof-property/]

You might think you’re writing JSX:

```jsx
<marquee bgcolor="#ffa7c4">hi</marquee>
```

But really, you’re calling a function:

```jsx
React.createElement(
  /* type */ 'marquee',
  /* props */ { bgcolor: '#ffa7c4' },
  /* children */ 'hi'
)
```

And that function gives you back an object. We call this object a React element. It tells React what to render next. Your components return a tree of them.

```jsx
{
  type: 'marquee',
  props: {
    bgcolor: '#ffa7c4',
    children: 'hi',
  },
  key: null,
  ref: null,
  $$typeof: Symbol.for('react.element'), // 🧐 Who dis
}
```

if your server has a hole that lets the user store an arbitrary JSON object while the client code expects a string, this could become a problem:

```jsx
// Server could have a hole that lets user store JSON
let expectedTextButGotJSON = {
  type: 'div',
  props: {
    dangerouslySetInnerHTML: {
      __html: '/* put your exploit here */'
    },
  },
  // ...
};
let message = { text: expectedTextButGotJSON };

// Dangerous in React 0.13
<p>
  {message.text}
</p>
```

In that case, React 0.13 would be vulnerable to an XSS attack. To clarify, again, this attack depends on an existing server hole. Still, React could do a better job of protecting people against it. And starting with React 0.14, it does.

The fix in React 0.14 was to tag every React element with a Symbol:

```jsx
{
  type: 'marquee',
  props: {
    bgcolor: '#ffa7c4',
    children: 'hi',
  },
  key: null,
  ref: null,
  $$typeof: Symbol.for('react.element'),
}
```

This works because you can’t just put Symbols in JSON. So even if the server has a security hole and returns JSON instead of text, that JSON can’t include Symbol.for('react.element'). React will check element.$$typeof, and will refuse to process the element if it’s missing or invalid.

---

# "Framework Architecture State and Lifecycle"
## Состояние и жизненный цикл
[https://ru.reactjs.org/docs/state-and-lifecycle.html]

### Преобразование функционального компонента в классовый

1. Создаём ES6-класс с таким же именем, указываем React.Component в качестве родительского класса
2. Добавим в класс пустой метод render()
3. Перенесём тело функции в метод render()
4. Заменим props на this.props в теле render()
5. Удалим оставшееся пустое объявление функции

### Добавим внутреннее состояние в класс

1. Заменим this.props.date на this.state.date в методе render():

```jsx
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Привет, мир!</h1>
        <h2>Сейчас {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

2. Добавим конструктор класса, в котором укажем начальное состояние в переменной this.state:

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Привет, мир!</h1>
        <h2>Сейчас {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

3. Удалим проп date из элемента <Clock />:

```jsx
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

### Добавим методы жизненного цикла в класс

В приложениях с множеством компонентов очень важно освобождать используемые системные ресурсы когда компоненты удаляются.

Метод componentDidMount() запускается после того, как компонент отрендерился в DOM — здесь мы и установим таймер:

```jsx
componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```

Поля this.props и this.state в классах особенные, и их устанавливает сам React. Вы можете вручную добавить новые поля, если компоненту нужно хранить дополнительную информацию (например, ID таймера).

Теперь нам осталось сбросить таймер в методе жизненного цикла componentWillUnmount():

```jsx
componentWillUnmount() {
    clearInterval(this.timerID);
  }
```

Давайте рассмотрим наше решение и разберём порядок, в котором вызываются методы:

1. Когда мы передаём <Clock /> в ReactDOM.render(), React вызывает конструктор компонента. Clock должен отображать текущее время, поэтому мы задаём начальное состояние this.state объектом с текущим временем.
2. React вызывает метод render() компонента Clock. Таким образом React узнаёт, что отобразить на экране. Далее, React обновляет DOM так, чтобы он соответствовал выводу рендера Clock.
3. Как только вывод рендера Clock вставлен в DOM, React вызывает метод жизненного цикла componentDidMount(). Внутри него компонент Clock указывает браузеру установить таймер, который будет вызывать tick() раз в секунду.
4. Таймер вызывает tick() ежесекундно. Внутри tick() мы просим React обновить состояние компонента, вызывая setState() с текущим временем. React реагирует на изменение состояния и снова запускает render(). На этот раз this.state.date в методе render() содержит новое значение, поэтому React заменит DOM. Таким образом компонент Clock каждую секунду обновляет UI.
5. Если компонент Clock когда-либо удалится из DOM, React вызовет метод жизненного цикла componentWillUnmount() и сбросит таймер.

### Как правильно использовать состояние

Важно знать три детали о правильном применении setState().

#### Не изменяйте состояние напрямую

В следующем примере повторного рендера не происходит:

```jsx
// Неправильно
this.state.comment = 'Привет';
```

Вместо этого используйте setState():

```jsx
// Правильно
this.setState({comment: 'Привет'});
```

Конструктор — это единственное место, где вы можете присвоить значение this.state напрямую.

#### Обновления состояния могут быть асинхронными

React может сгруппировать несколько вызовов setState() в одно обновление для улучшения производительности.

Поскольку this.props и this.state могут обновляться асинхронно, вы не должны полагаться на их текущее значение для вычисления следующего состояния.

Например, следующий код может не обновить счётчик:

```jsx
// Неправильно
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

Правильно будет использовать второй вариант вызова setState(), который принимает функцию, а не объект. Эта функция получит предыдущее состояние в качестве первого аргумента и значения пропсов непосредственно во время обновления в качестве второго аргумента:

```jsx
// Правильно
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

#### Обновления состояния объединяются

Когда мы вызываем setState(), React объединит аргумент (новое состояние) c текущим состоянием.

```jsx
componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```

Состояния объединяются поверхностно, поэтому вызов this.setState({comments}) оставляет this.state.posts нетронутым, но полностью заменяет this.state.comments.

#### Однонаправленный поток данных

В иерархии компонентов, ни родительский, ни дочерние компоненты не знают, задано ли состояние другого компонента. Также не важно, как был создан определённый компонент — с помощью функции или класса.

Состояние часто называют «локальным», «внутренним» или инкапсулированным. Оно доступно только для самого компонента и скрыто от других.

Компонент FormattedDate получает date через пропсы, но он не знает, откуда они взялись изначально — из состояния Clock, пропсов Clock или просто JavaScript-выражения:

```jsx
function FormattedDate(props) {
  return <h2>Сейчас {props.date.toLocaleTimeString()}.</h2>;
}
```

Этот процесс называется «нисходящим» («top-down») или «однонаправленным» («unidirectional») потоком данных. Состояние всегда принадлежит определённому компоненту, а любые производные этого состояния могут влиять только на компоненты, находящиеся «ниже» в дереве компонентов.

Если представить иерархию компонентов как водопад пропсов, то состояние каждого компонента похоже на дополнительный источник, который сливается с водопадом в произвольной точке, но также течёт вниз.

В React-приложениях, имеет ли компонент состояние или нет — это внутренняя деталь реализации компонента, которая может меняться со временем. Можно использовать компоненты без состояния в компонентах с состоянием, и наоборот.

---

## React Component Lifecycle Old vs New
[https://medium.com/@kartikag01/react-component-lifecycle-old-vs-new-32757aee5850]

Methods Deprecated in 16.4
  componentWillMount()
  componentWillReceiveProps()
  componentWillUpdate()
New Methods introduced
  getDerivedStateFromProps()
  getSnapshotBeforeUpdate()

componentWillMount() → UNSAFE_componentWillMount()
componentWillReceiveProps() → UNSAFE_componentWillReceiveProps()
componentWillUpdate() → UNSAFE_componentWillUpdate()

---

## How Does setState Know What to Do?
[https://overreacted.io/how-does-setstate-know-what-to-do/]

The answer is that every renderer sets a special field on the created class. This field is called updater. It’s not something you would set — rather, it’s something React DOM, React DOM Server or React Native set right after creating an instance of your class:

```jsx
// Inside React DOM
const inst = new YourComponent();
inst.props = props;
inst.updater = ReactDOMUpdater;

// Inside React DOM Server
const inst = new YourComponent();
inst.props = props;
inst.updater = ReactDOMServerUpdater;

// Inside React Native
const inst = new YourComponent();
inst.props = props;
inst.updater = ReactNativeUpdater;
```

Looking at the setState implementation in React.Component, all it does is delegate work to the renderer that created this component instance:

```jsx
// A bit simplified
setState(partialState, callback) {
  // Use the `updater` field to talk back to the renderer!
  this.updater.enqueueSetState(this, partialState, callback);
}
```

React DOM Server might want to ignore a state update and warn you, whereas React DOM and React Native would let their copies of the reconciler handle it.

And this is how this.setState() can update the DOM even though it’s defined in the React package. It reads this.updater which was set by React DOM, and lets React DOM schedule and handle the update.

We know about classes now, but what about Hooks?

Instead of an updater field, Hooks use a “dispatcher” object. When you call React.useState(), React.useEffect(), or another built-in Hook, these calls are forwarded to the current dispatcher.

```jsx
// In React (simplified a bit)
const React = {
  // Real property is hidden a bit deeper, see if you can find it!
  __currentDispatcher: null,

  useState(initialState) {
    return React.__currentDispatcher.useState(initialState);
  },

  useEffect(initialState) {
    return React.__currentDispatcher.useEffect(initialState);
  },
  // ...
};
```
```jsx
// In React DOM
const prevDispatcher = React.__currentDispatcher;
React.__currentDispatcher = ReactDOMDispatcher;
let result;
try {
  result = YourComponent(props);
} finally {
  // Restore it back
  React.__currentDispatcher = prevDispatcher;
}
```

---
