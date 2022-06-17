import React from "react";
import { useParams } from "react-router-dom";

export default function Education() {
  const { string_slug } = useParams();
  return (
    <section className="education mt-3">
      <p className="heading fw-bold fs-4 border-bottom">Education</p>
      <div className="list-group">
        <a
          href="./about-me/study-in-mst"
          role="button"
          data-toggle="collapse-mst-study"
          className="list-group-item list-group-item-action"
          aria-current="true"
        >
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">
              Missouri University of Science and Technology
            </h5>
            <small>Current(2022-2024)</small>
          </div>
          <p className="mb-1">Masters in Computer and Information Sciences</p>
          {/* <small>And some small print.</small> */}
        </a>
        <div
          className={`collapse ${
            string_slug === "study-in-mst" && "show"
          }  collapse-mst-study`}
        >
          <div className="card card-body">
            <details>
              <summary>High Performance Computing</summary>
              In this course, at the initial step the serial unoptimized
              algorithm is taken and applies cache blocking, register blocking,
              loop unrolling, improving the data access pattern to enable
              efficient use of cache like BLAS operations until . Later the
              serially optimized is converted to parallel algorithm by applying
              parallel algorithm design techniques such as Partitioning,
              Communication, Agglomeration, Mapping.I learned the
              parallelization of matrix-matrix multiplication, matrix-vector
              multiplication, sieve of eratosthenes of prime numbers, Floyd
              Warshall’s algorithm. I learned parallelization by distributed
              memory architecture using MPI, shared memory architecture with
              openMP. I learned about how to calculate time complexity for
              parallel algorithms.
            </details>

            <details>
              <summary>Java GUI and Visualization</summary>
              In this course I have revised my Java programming skills and
              learned JavaFX for developing desktop apps. In this course I have
              developed a desktop application related to spatial relations of
              circle.
            </details>

            <details>
              <summary>Introduction To Artificial Intelligence</summary>
              In this course I have learned to Implement DFS, BFS, Greedy
              Breadth First Search, A star algorithm though Solving a Puzzle
              Named Pengu. I also learned Min-Max, Min-Max with alpha beta
              pruning, Time limited Min Max, Quiescence Search, Move ordering in
              the Min-Max by programming the chess Agent from scratch.
            </details>
          </div>
        </div>
        <div className="list-group-item list-group-item-action">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">V R Sidhartha Engineering College</h5>
            <small className="text-muted">2013-2017</small>
          </div>
          <p className="mb-1">Bachelors in Computer Science and Engineering</p>
          {/* <small className="text-muted">And some muted small print.</small> */}
        </div>
      </div>
    </section>
  );
}
