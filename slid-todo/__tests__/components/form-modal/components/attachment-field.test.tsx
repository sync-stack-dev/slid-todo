import { renderWithProviders } from "../../../data/test-utils";
import { screen, fireEvent } from "@testing-library/react";
import { AttachmentField } from "@/components/shared/form-modal/components/attachment-field";
import { FormProvider, useForm } from "react-hook-form";
import { PLACEHOLDER_TEXT } from "@/components/shared/form-modal/constants";
import { expect } from "@jest/globals";

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: {
      linkUrl: "",
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("AttachmentField", () => {
  const mockProps = {
    activeField: null as "file" | "link" | null,
    selectedFile: null as File | null,
    onFileSelect: jest.fn(),
    onFileRemove: jest.fn(),
    setActiveField: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props = mockProps) => {
    return renderWithProviders(
      <FormWrapper>
        <AttachmentField {...props} />
      </FormWrapper>,
    );
  };

  describe("기본 렌더링", () => {
    it("자료 레이블이 표시된다", () => {
      renderComponent();
      expect(screen.getByText("자료")).toBeInTheDocument();
    });

    it("파일 업로드와 링크 첨부 버튼이 표시된다", () => {
      renderComponent();
      expect(screen.getByText("파일 업로드")).toBeInTheDocument();
      expect(screen.getByText("링크 첨부")).toBeInTheDocument();
    });
  });

  describe("파일 업로드 모드", () => {
    it("파일 업로드 버튼 클릭 시 activeField가 변경된다", () => {
      renderComponent();
      fireEvent.click(screen.getByText("파일 업로드"));
      expect(mockProps.setActiveField).toHaveBeenCalledWith("file");
    });

    it("파일이 선택되지 않았을 때 드롭존이 표시된다", () => {
      renderComponent({ ...mockProps, activeField: "file" });
      expect(screen.getByText(PLACEHOLDER_TEXT.fileUrl)).toBeInTheDocument();
    });

    it("파일이 선택되었을 때 파일명이 표시된다", () => {
      const file = new File(["test"], "test.txt", { type: "text/plain" });
      renderComponent({
        ...mockProps,
        activeField: "file",
        selectedFile: file,
      });
      expect(screen.getByText("test.txt")).toBeInTheDocument();
    });

    it("선택된 파일 제거 버튼이 동작한다", () => {
      const testFile = new File(["test"], "test.txt", { type: "text/plain" });
      renderComponent({
        ...mockProps,
        activeField: "file",
        selectedFile: testFile,
      });

      // 파일명이 표시되는지 확인
      expect(screen.getByText("test.txt")).toBeInTheDocument();

      // size="sm" variant="ghost" 속성을 가진 버튼 찾기
      const removeButton = screen.getByRole("button", {
        name: "", // 빈 문자열로 변경
      });

      fireEvent.click(removeButton);
      expect(mockProps.onFileRemove).toHaveBeenCalled();
    });

    it("드래그 앤 드롭으로 파일을 업로드할 수 있다", () => {
      renderComponent({ ...mockProps, activeField: "file" });

      const dropzone = screen.getByText(PLACEHOLDER_TEXT.fileUrl);
      const file = new File(["test"], "test.txt", { type: "text/plain" });

      fireEvent.dragOver(dropzone);
      fireEvent.drop(dropzone, {
        dataTransfer: {
          files: [file],
        },
      });

      expect(mockProps.onFileSelect).toHaveBeenCalledWith(file);
    });
  });

  describe("링크 첨부 모드", () => {
    it("링크 첨부 버튼 클릭 시 activeField가 변경된다", () => {
      renderComponent();
      fireEvent.click(screen.getByText("링크 첨부"));
      expect(mockProps.setActiveField).toHaveBeenCalledWith("link");
    });

    it("링크 입력 필드가 표시된다", () => {
      renderComponent({ ...mockProps, activeField: "link" });
      expect(screen.getByPlaceholderText(PLACEHOLDER_TEXT.linkUrl)).toBeInTheDocument();
    });

    it("링크를 입력할 수 있다", () => {
      renderComponent({ ...mockProps, activeField: "link" });
      const input = screen.getByPlaceholderText(PLACEHOLDER_TEXT.linkUrl);

      fireEvent.change(input, { target: { value: "https://example.com" } });
      expect(input).toHaveValue("https://example.com");
    });
  });

  describe("토글 동작", () => {
    it("활성화된 필드를 다시 클릭하면 비활성화된다", () => {
      renderComponent({ ...mockProps, activeField: "file" });
      fireEvent.click(screen.getByText("파일 업로드"));
      expect(mockProps.setActiveField).toHaveBeenCalledWith(null);
    });

    it("다른 필드를 클릭하면 활성화된 필드가 변경된다", () => {
      renderComponent({ ...mockProps, activeField: "file" });
      fireEvent.click(screen.getByText("링크 첨부"));
      expect(mockProps.setActiveField).toHaveBeenCalledWith("link");
    });
  });
});
