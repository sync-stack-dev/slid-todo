import { MoreMenu } from "@/app/(routes)/(todos)/todos/components/todo/actions/more-menu";
import { FormModal } from "@/components/shared/form-modal";
import { ConfirmModal } from "@/components/shared/confirm-modal";
import { useFormModal } from "@/stores/use-form-modal-store";
import { useConfirmModal } from "@/stores/use-confirm-modal-store";
import { todoWithAllProps } from "../../../../test-data";
import { mount } from "cypress/react18";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("할 일 더보기 메뉴", () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  beforeEach(() => {
    useFormModal.getState().onClose();
    useConfirmModal.getState().onClose();

    mount(
      <QueryClientProvider client={queryClient}>
        <>
          <MoreMenu todo={todoWithAllProps} />
          <FormModal />
          <ConfirmModal />
        </>
      </QueryClientProvider>,
    );
  });

  afterEach(() => {
    useFormModal.getState().onClose();
    useConfirmModal.getState().onClose();
    queryClient.clear();
  });

  it("수정 및 삭제 버튼이 나타나야 한다", () => {
    cy.get("[data-cy=more-button]").click();
    cy.get("[data-cy=edit-button]").should("exist");
    cy.get("[data-cy=delete-button]").should("exist");
  });

  it("수정 버튼을 클릭하면 수정 모달이 열려야 한다", () => {
    cy.get("[data-cy=more-button]").click();
    cy.get("[data-cy=edit-button]").click();
    cy.get("[data-cy=form-modal]").should("be.visible");
  });

  it("삭제 버튼을 클릭하면 삭제 컨펌이 열려야 한다", () => {
    cy.get("[data-cy=more-button]").click();
    cy.get("[data-cy=delete-button]").click();
    cy.get("[data-cy=confirm-modal]").should("be.visible");
  });
});
