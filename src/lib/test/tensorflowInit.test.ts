import exp from "constants";
import QnaModel from "../tensorflowInit";
import * as qna from "@tensorflow-models/qna";

describe("QnaModel", () => {
  let qnaModel: QnaModel;

  describe("getInstance", () => {
    beforeEach(() => {
      qnaModel = new QnaModel();
    });

    it("should return a singleton instance of QnaModel", () => {
      const instance1 = QnaModel.getInstance();
      const instance2 = QnaModel.getInstance();
      expect(instance1).toBe(instance2);
    });

    it("should return a new instance of QnaModel if the previous instance is destroyed", () => {
      const instance1 = QnaModel.getInstance();
      QnaModel["instance"] = null;
      const instance2 = QnaModel.getInstance();
      expect(instance1).not.toBe(instance2);
    });
  });

  describe("initialize", () => {
    describe("without errors", () => {
      const initializeModel = async () => {
        const model = new QnaModel();
        await model.initialize(jest.fn());
        return model;
      };

      it("should initialize the Q&A model", async () => {
        const loadSpy = jest
          .spyOn(qna, "load")
          .mockResolvedValue({} as qna.QuestionAndAnswer);
        await initializeModel();
        expect(loadSpy).toHaveBeenCalled();
      });

      it("should reuse the existing model if it is already initialized", async () => {
        const loadSpy = jest
          .spyOn(qna, "load")
          .mockResolvedValue({} as qna.QuestionAndAnswer);
        await initializeModel();
        await initializeModel();
        expect(loadSpy).toHaveBeenCalledTimes(1);
      });
    });

    xdescribe("with errors", () => {
      jest.mock("@tensorflow-models/qna", () => ({
        load: jest.fn(),
      }));

      xit("should catch and log any errors during initialization", async () => {
        // currently not able to mock an initialization error
        // maybe the catch block isn't really needed
      });
    });
  });

  describe("askQuestion", () => {});
});
