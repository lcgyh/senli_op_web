
import { Avatar, Card, Col, List, Skeleton, Row, Statistic } from 'antd';
import styles from './style.less';

const ExtraContent = () => (
  <div className={styles.extraContent}>
    <div className={styles.statItem}>
      <Statistic title="今日待办" value={56} />
    </div>
    <div className={styles.statItem}>
      <Statistic title="待办总数" value={8} suffix="/ 24" />
    </div>
    <div className={styles.statItem}>
      <Statistic title="遗留待办" value={2223} />
    </div>
  </div>
);

export default ExtraContent