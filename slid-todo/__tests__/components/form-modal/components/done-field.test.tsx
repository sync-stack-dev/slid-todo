import { renderWithProviders } from "../../../data/test-utils";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { DoneField } from "@/components/shared/form-modal/components/done-field";
import { FormProvider, useForm } from "react-hook-form";
import { expect } from "@jest/globals";

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: {
      done: false,
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("DoneField", () => {
  beforeAll(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  const renderComponent = () => {
    return renderWithProviders(
      <FormWrapper>
        <DoneField />
      </FormWrapper>,
    );
  };

  it("체크박스와 레이블이 렌더링된다", () => {
    renderComponent();

    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByText("완료된 할 일")).toBeInTheDocument();
  });

  it("체크박스의 초기값은 false이다", () => {
    renderComponent();

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  it("체크박스를 클릭하면 상태가 변경된다", async () => {
    renderComponent();

    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);
    await waitFor(() => {
      expect(checkbox).toBeChecked();
    });

    fireEvent.click(checkbox);
    await waitFor(() => {
      expect(checkbox).not.toBeChecked();
    });
  });

  describe("레이아웃", () => {
    it("체크박스와 레이블이 올바르게 정렬된다", () => {
      renderComponent();

      const formItem = screen.getByRole("checkbox").closest(".flex.flex-row");
      expect(formItem).toHaveClass("flex", "flex-row", "items-center", "space-x-2", "space-y-0");
    });
  });

  describe("상태 변경", () => {
    it("체크박스 상태 변경 시 콘솔에 로그가 출력된다", async () => {
      const consoleSpy = jest.spyOn(console, "log");
      renderComponent();

      const checkbox = screen.getByRole("checkbox");
      fireEvent.click(checkbox);

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith("Checkbox changed to:", true);
      });

      consoleSpy.mockRestore();
    });
  });
});
