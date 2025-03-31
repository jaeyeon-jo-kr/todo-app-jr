'use client'

import { usePostStatistics } from "hooks/usePost";
import "@/styles/post/statistics/styles.css";
export default function PostStatistics() {
    const { postStatistics } = usePostStatistics();
    console.debug(postStatistics);

    return (<table>
        <thead>
            <tr>
                <th>userId</th>
                <th>postCount</th>
                <th>year</th>
                <th>month</th>
                <th>increaseRate</th>
            </tr>
        </thead>
        <tbody>
            {postStatistics.map((postStatistic) => (
                <tr key={postStatistic.userId}>
                    <td>{postStatistic.userId}</td>
                    <td>{postStatistic.postCount}</td>
                    <td>{postStatistic.year}</td>
                    <td>{postStatistic.month}</td>
                    <td>{postStatistic.increaseRate}</td>
                </tr>
            ))}
        </tbody>
    </table>);
}
