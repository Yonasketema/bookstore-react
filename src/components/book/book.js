import React, { useState } from "react";

const Book = () => {
  return (
    <section>
      <img src="" alt="" />
      <div>
        <p>yonpia</p>

        <div>
          <div>
            <button>
              <i className=" heart fa-solid fa-heart fa-2x "></i>
            </button>

            <div>
              <button>
                <i className="fa-solid fa-comment fa-2x"></i>
              </button>
            </div>
          </div>

          <div>
            <button>
              <i className="fa-solid fa-bookmark fa-2x"></i>
            </button>
            <button>
              <i className="fa-solid fa-bookmark fa-2x"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Book;
