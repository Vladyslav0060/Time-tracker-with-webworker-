import styles from "../CssModules/Home.module.css";
const Home = () => {
  return (
    <div className="wrapper">
      <div className="content">
        <h1>Home page</h1>
        <div className={styles.gridContainer}>
          <div className={styles.form1}>
            <h2>What can it do?</h2>
            <p style={{ fontSize: "2.5vh" }}>
              Time management application helps you to control and track time
              spent on different actions.Time management application helps you
              to control and track time spent on different actions.Time
              management application helps you to control and track time spent
              on different actions.Time management application helps you to
              control and track time spent on different actions.Time management
              application helps you to control and track time spent on different
              actions.
            </p>
            <span>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit
              deleniti exercitationem molestiae aliquid explicabo accusamus sit
              nihil voluptatum? Ad, voluptas! Quidem qui nisi consequatur? Quia
              recusandae suscipit harum molestiae sint.
            </span>
          </div>
          <div className={styles.form2}>
            <h2>Easy to use</h2>
            <p style={{ fontSize: "2.5vh" }}>
              Time management application helps you to control and track time
              spent on different actions.Time management application helps you
              to control and track time spent on different actions.Time
              management application helps you to control and track time spent
              on different actions.Time management application helps you to
              control and track time spent on different actions.Time management
              application helps you to control and track time spent on different
              actions.
            </p>
          </div>
          <div className={styles.form3}>
            <h2>Absolutely free</h2>
            <p style={{ fontSize: "2.5vh" }}>
              Time management application helps you to control and track time
              spent on different actions.Time management application helps you
              to control and track time spent on different actions.Time
              management application helps you to control and track time spent
              on different actions.Time management application helps you to
              control and track time spent on different actions.Time management
              application helps you to control and track time spent on different
              actions.
            </p>
          </div>
          <div className={styles.form4}>
            <h2>Absolutely free</h2>
            <p style={{ fontSize: "2.5vh" }}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum
              ullam doloribus aliquam, soluta in deserunt tempore quam quia
              earum enim accusamus maxime dicta sequi maiores porro! Soluta
              aliquid velit minima adipisci labore repellendus, veritatis
              delectus dolore, laboriosam consequuntur modi, optio sequi
              explicabo debitis nobis provident!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
